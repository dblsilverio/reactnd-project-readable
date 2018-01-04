export default function mapStateToProps({ category }) {
    const { categories } = category;

    return {
        categories
    }

}