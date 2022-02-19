'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Artists', 
        [
            { name: "The Beatles", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/beatles+art.jpg", headerUrl: "https://i.imgur.com/BmvEXOy.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Taylor Swift", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/taylor+art.jpg", headerUrl: "https://i.imgur.com/zLGGbek.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Kendrick Lamar", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/kendrick+art.jpg", headerUrl: "https://i.imgur.com/DShW9Q7.jpeg", createdAt: new Date(), updatedAt: new Date() },
            { name: "FLOW", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/flow+art.jpg", headerUrl: "https://i.imgur.com/2DygT0m.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "System of a Down", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/soad+art.jpg", headerUrl: "https://i.imgur.com/sSvRbRK.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Green Day", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/green+day+art.jpg", headerUrl: "https://i.imgur.com/kqAlOFN.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Creedence Clearwater Revival", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/creedence+art.jpg", headerUrl: "https://i.imgur.com/LlWrJM0.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Pink Floyd", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/pink+floyd+art.jpg", headerUrl: "https://i.imgur.com/IMwBzMd.png", createdAt: new Date(), updatedAt: new Date() },
            { name: "Linkin Park", imgUrl: "https://crescendo-bucket.s3.us-west-1.amazonaws.com/artist+art/linkin+park+art.jpg", headerUrl: "https://i.imgur.com/x2eDB0E.png", createdAt: new Date(), updatedAt: new Date() }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Artists', null, { truncate: true, cascade: true, restartIdentity: true });
    }
};