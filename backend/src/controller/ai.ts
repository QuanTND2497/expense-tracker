import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Xử lý yêu cầu chat
export const processChatRequest = async (req: Request, res: Response) => {
    try {
        const { question, transactions } = req.body;
        const userId = req.user?.['id'];

        if (!question) {
            return res
                .status(400)
                .json({ message: 'Câu hỏi không được để trống' });
        }

        // Chuẩn bị thông tin về các giao dịch và danh mục
        let transactionInfo = '';
        if (transactions && transactions.length > 0) {
            const transactionData = transactions
                .map(
                    (t: any) =>
                        `- Ngày: ${new Date(
                            t.date
                        ).toLocaleDateString()}, Mô tả: ${
                            t.description || 'N/A'
                        }, Số tiền: ${t.amount} ${t.currency}, Loại: ${
                            t.type === 'income' ? 'Thu nhập' : 'Chi tiêu'
                        }`
                )
                .join('\n');

            transactionInfo = `Giao dịch gần đây của bạn:\n${transactionData}\n\n`;
        }

        // Tạo prompt cho AI
        const prompt = `Bạn là trợ lý tài chính cá nhân, giúp người dùng quản lý chi tiêu và đưa ra lời khuyên về tài chính cá nhân.
        ${transactionInfo}
        
        Câu hỏi của người dùng: ${question}
        
        Trả lời ngắn gọn, súc tích và đưa ra lời khuyên cụ thể dựa trên thông tin có sẵn.`;

        // Gọi OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'Bạn là trợ lý tài chính cá nhân chuyên nghiệp. Bạn đưa ra lời khuyên ngắn gọn, hữu ích về quản lý tài chính cá nhân và chi tiêu.'
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        // Trả về phản hồi
        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).json({ message: 'Lỗi xử lý yêu cầu chat' });
    }
};

// Xử lý phân tích chi tiêu
export const processSpendingAnalysis = async (req: Request, res: Response) => {
    try {
        const { transactions, timeframe } = req.body;
        const userId = req.user?.['id'];

        if (!transactions || !Array.isArray(transactions)) {
            return res
                .status(400)
                .json({ message: 'Dữ liệu giao dịch không hợp lệ' });
        }

        if (!timeframe || !['week', 'month', 'year'].includes(timeframe)) {
            return res
                .status(400)
                .json({ message: 'Khung thời gian không hợp lệ' });
        }

        // Lấy thêm danh mục để phân tích chi tiêu
        const categories = await prisma.category.findMany({
            where: {
                id: {
                    in: transactions.map((t) => t.categoryId)
                }
            }
        });

        // Tạo bản tóm tắt giao dịch theo danh mục
        const categoryMap: Record<string, { name: string; total: number }> = {};

        transactions.forEach((transaction: any) => {
            const category = categories.find(
                (c) => c.id === transaction.categoryId
            );
            if (category) {
                if (!categoryMap[category.id]) {
                    categoryMap[category.id] = {
                        name: category.name,
                        total: 0
                    };
                }
                categoryMap[category.id].total += transaction.amount;
            }
        });

        const categorySummary = Object.values(categoryMap)
            .map((cat) => `- ${cat.name}: ${cat.total}`)
            .join('\n');

        // Phân chia giao dịch theo loại
        const incomeTransactions = transactions.filter(
            (t: any) => t.type === 'income'
        );
        const expenseTransactions = transactions.filter(
            (t: any) => t.type === 'expense'
        );

        const totalIncome = incomeTransactions.reduce(
            (sum: number, t: any) => sum + parseFloat(t.amount),
            0
        );
        const totalExpense = expenseTransactions.reduce(
            (sum: number, t: any) => sum + parseFloat(t.amount),
            0
        );

        // Tạo prompt cho AI
        const prompt = `Phân tích chi tiêu của tôi trong ${
            timeframe === 'week'
                ? 'tuần'
                : timeframe === 'month'
                ? 'tháng'
                : 'năm'
        } qua:

        Tổng thu nhập: ${totalIncome}
        Tổng chi tiêu: ${totalExpense}
        
        Phân tích chi tiêu theo danh mục:
        ${categorySummary}
        
        Hãy phân tích chi tiêu của tôi và đưa ra 3-5 gợi ý giúp tôi tiết kiệm tiền dựa trên dữ liệu này. Tập trung vào các danh mục có chi tiêu cao nhất và cơ hội để cắt giảm chi tiêu không cần thiết.`;

        // Gọi OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'Bạn là trợ lý tài chính cá nhân. Hãy phân tích chi tiêu và đưa ra lời khuyên để tiết kiệm tiền.'
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500
        });

        // Trả về phân tích
        res.json({ analysis: response.choices[0].message.content });
    } catch (error) {
        console.error('Error processing spending analysis:', error);
        res.status(500).json({ message: 'Lỗi xử lý phân tích chi tiêu' });
    }
};

// Xử lý ảnh hóa đơn
export const processReceiptImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ message: 'Không có tệp hình ảnh được tải lên' });
        }

        const userId = req.user?.['id'];
        const imageBuffer = req?.file?.buffer;

        // Chuyển đổi buffer sang base64
        const base64Image = imageBuffer.toString('base64');

        // Gọi OpenAI Vision API để nhận dạng thông tin từ ảnh hóa đơn
        const response = await openai.chat.completions.create({
            model: 'gpt-4-vision-preview',
            messages: [
                {
                    role: 'system',
                    content:
                        'Bạn là trợ lý nhận dạng hóa đơn. Hãy trích xuất thông tin từ hình ảnh hóa đơn và trả về dưới dạng cấu trúc JSON.'
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Đây là hình ảnh hóa đơn. Hãy trích xuất các thông tin sau: ngày, người bán/cửa hàng, danh sách sản phẩm (nếu có), tổng tiền, thuế (nếu có) và loại tiền tệ. Trả về dữ liệu dưới dạng JSON theo định dạng: { "date": "YYYY-MM-DD", "merchant": "Tên cửa hàng", "items": [{ "name": "Tên sản phẩm", "price": số tiền, "quantity": số lượng }], "total": số tiền, "taxAmount": số tiền, "currency": "VND" }'
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1500
        });

        // Phân tích phản hồi để lấy JSON
        const content = response.choices[0].message.content || '';
        const jsonMatch =
            content.match(/```json\n([\s\S]*?)\n```/) ||
            content.match(/\{[\s\S]*\}/);

        let parsedData;
        if (jsonMatch) {
            try {
                // Lấy phần JSON từ phản hồi
                const jsonString = jsonMatch[1] || jsonMatch[0];
                parsedData = JSON.parse(jsonString);
            } catch (e) {
                console.error('Error parsing JSON from AI response:', e);
                return res
                    .status(500)
                    .json({ message: 'Lỗi xử lý dữ liệu từ hóa đơn' });
            }
        } else {
            return res
                .status(500)
                .json({ message: 'Không thể trích xuất dữ liệu từ hình ảnh' });
        }

        // Trả về dữ liệu đã phân tích
        res.json({ parsedData });
    } catch (error) {
        console.error('Error processing receipt image:', error);
        res.status(500).json({ message: 'Lỗi xử lý ảnh hóa đơn' });
    }
};
