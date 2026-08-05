import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'order_management',
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Margherita Pizza',
        description: 'Classic cheese pizza with fresh basil',
        price: 299,
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      },
      {
        name: 'Cheese Burger',
        description: 'Juicy beef burger with cheddar cheese',
        price: 249,
        imageUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      },
      {
        name: 'Chicken Biryani',
        description: 'Authentic Hyderabadi dum biryani',
        price: 349,
        imageUrl:
          'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'French Fries',
        description: 'Golden crispy fries',
        price: 149,
        imageUrl:
          'https://images.unsplash.com/photo-1576107232684-1279f390859f',
      },
      {
        name: 'Pasta Alfredo',
        description: 'Creamy Alfredo pasta',
        price: 279,
        imageUrl:
          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      },
      {
        name: 'Chocolate Shake',
        description: 'Rich chocolate milkshake',
        price: 199,
        imageUrl:
          'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
      },
      {
        name: 'Milk Shake',
        description: 'Rich milkshake',
        price: 190,
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1695868328902-b8a3b093da74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Cheese Cake',
        description: 'Delicious cheese cake',
        price: 299,
        imageUrl:
          'https://images.unsplash.com/photo-1567171466295-4afa63d45416?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  });

  console.log('Menu seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
