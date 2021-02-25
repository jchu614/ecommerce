import bcrypt from 'bcrypt';

const data = {
    users: [
        {
            name: "Jason",
            email:"admin@admin.com",
            password:bcrypt.hashSync('rustyrusty', 8),
            isAdmin: true,
        },
        {
            name: "Jon",
            email:"dude@dude.com",
            password:bcrypt.hashSync('123123', 8),
            isAdmin: false,
        },
        {
            name: "Bill o Bill",
            email: "billobill@bill.com",
            password:bcrypt.hashSync('bill', 8),
            isAdmin: true,
            isSeller: false
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            images: '/images/product-1.jpg',
            price: 120,
            countInStock: 12,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            category: 'test'
        },
        {
            name: 'Adidas Slim Shirt',
            category: 'Shirts',
            images: '/images/product-2.jpg',
            price: 100,
            countInStock: 5,
            brand: 'Adidas',
            rating: 4,
            numReviews: 10,
            description: 'high quality product',
            category: 'test'
        },
        {
            name: 'Lacoste Slim Shirt',
            category: 'Shirts',
            images: '/images/product-3.jpg',
            price: 220,
            countInStock: 15,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
            category: 'test'
        },
        {
            name: 'Nike Slim Pants',
            category: 'Pants',
            images: '/images/product-4.jpg',
            price: 137,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
            category: 'test'
        },
        {
            name: 'Puma Slim Pants',
            category: 'Pants',
            images: '/images/product-5.jpg',
            price: 60,
            countInStock: 20,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            category: 'test'
        },
        {
            name: 'Adidas Slim Pants',
            category: 'Pants',
            images: '/images/product-6.jpg',
            price: 139,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            category: 'test'
        },
    ]
}

export default data;