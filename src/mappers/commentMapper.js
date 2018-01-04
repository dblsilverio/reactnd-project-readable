export default function mapStateToProps({ comment }) {
    const { comments } = comment;

    return {
        comments
    }

}