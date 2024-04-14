const notificationType = (id) => {
    // {1: "add a new post"},
    // {2: "reaction to your comment"},
    // {3: "react post"},
    // {4: "reply to your comment"}
    switch(id) {
        case 1:
            return "add a new post";
        case 2:
            return "like your comment";
        case 3:
            return "like your post";
        case 4:
            return "reply to your comment";
        case 5:
            return "comment to your post";
        default:
            break;
    }
}
export default notificationType;