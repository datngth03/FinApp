import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
    comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
    return (
        <>
            {comments
                ? comments.map((comment: any, index: number) => {
                    return <StockCommentListItem key={`${index}`} comment={comment} />;
                })
                : ""}
        </>
    );
};

export default StockCommentList;
