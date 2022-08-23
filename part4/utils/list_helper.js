const dummy = (blogs) => {
    return 1;
};

const totalLikes = (posts) => {
    const likes = posts.reduce((sum, post) => sum + post.likes, 0);
    return likes;
};

const favoriteBlog = (blogs) => {
    let favorite = 0;
    for (let blog of blogs)
    {
        if (blog.likes > favorite)
        {
            favorite = blog.likes;
        }    
    }
    for (let blog of blogs)
    {
        if (blog.likes == favorite)
        {
            return blog;
        }
    }
}
module.exports = {
    dummy, totalLikes, favoriteBlog
}