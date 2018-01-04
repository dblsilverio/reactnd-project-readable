export default function (posts, sortKey, descending) {
    let sortedPosts = [];

    if (sortKey === 'voteScore') {
        sortedPosts = posts.sort((p, r) => {
            let ret = 0;

            if (r.voteScore < p.voteScore) {
                ret = 1;
            } else if (r.voteScore > p.voteScore) {
                ret = -1;
            }

            return ret * (descending ? 1 : -1);
        })
    } else if (sortKey === 'comment') {
        sortedPosts = posts.sort((p, r) => {
            let ret = 0;

            if (r.commentCount < p.commentCount) {
                ret = 1;
            } else if (r.commentCount > p.commentCount) {
                ret = -1;
            }

            return ret * (descending ? 1 : -1);
        })
    } else if (sortKey === 'title') {
        sortedPosts = posts.sort((p, r) => {
            let ret = 0;

            if (r.title < p.title) {
                ret = 1;
            } else if (r.title > p.title) {
                ret = -1;
            }

            return ret * (descending ? 1 : -1);
        })
    } else if (sortKey === 'date') {
        sortedPosts = posts.sort((p, r) => {
            return r.timestamp - p.timestamp * (descending ? 1 : -1);
        })
    } else if (sortKey === 'author') {
        sortedPosts = posts.sort((p, r) => {
            let ret = 0;

            if (r.author < p.author) {
                ret = 1;
            } else if (r.author > p.author) {
                ret = -1;
            }

            return ret * (descending ? 1 : -1);
        })
    }

    return sortedPosts;

}