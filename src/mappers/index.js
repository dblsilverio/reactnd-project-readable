export default function mapStateToProps({ category, comment, post }) {
    const { categories } = category;
    const { comments } = comment;
    const { posts } = post;
    
    return {
        categories,
        comments,
        posts
    };
}