import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding default categories...');

    const defaultCategories = [
        {
            name: 'Food',
            description: 'Expenses related to food and groceries',
            isDefault: true
        },
        {
            name: 'Transportation',
            description: 'Expenses related to transportation and travel',
            isDefault: true
        },
        {
            name: 'Bills',
            description: 'Expenses related to bills and utilities',
            isDefault: true
        },
        {
            name: 'Entertainment',
            description:
                'Expenses related to entertainment and leisure activities',
            isDefault: true
        }
    ];

    for (const category of defaultCategories) {
        // Check if the category already exists
        const existingCategory = await prisma.category.findFirst({
            where: {
                name: category.name,
                isDefault: true
            }
        });

        if (!existingCategory) {
            await prisma.category.create({
                data: category
            });
            console.log(`Created default category: ${category.name}`);
        } else {
            console.log(`Default category already exists: ${category.name}`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error('Error seeding default categories:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
