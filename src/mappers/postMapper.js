export default function mapStateToProps({ post }) {
    const { posts } = post;

    return {
        posts
    }

}