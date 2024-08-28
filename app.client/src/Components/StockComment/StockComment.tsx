import { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinners/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
    stockSymbol: string;
};

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const [comments, setComment] = useState<CommentGet[] | null>(null);

    useEffect(() => {
        getComments();
    }, []);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res: any) => {
                if (res) {
                    toast.success("Comment created successfully!");
                    getComments();
                }
            })
            .catch((e: any) => {
                toast.warning(e);
            });
    };

    const getComments = () => {
        commentGetAPI(stockSymbol).then((res: any) => {
            setComment(res?.data!);
        });
    };
    return (
        <div className="flex flex-col">
            <StockCommentList comments={comments!} />
            <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
        </div>
    );
};

export default StockComment;
