interface PostProps {
    id: string;
    author: {
        id: string;
        fullname: string;
        avatarUrl: string;
        dateJoined: Date;
    };
    datePosted: string;
    type: "text_only" | "text_and_image";
    impressions: {
        likes: number;
        dislikes: number;
        comments: number;
        shares: number;
    };
    showReactionOptions?: boolean;
    showCommentInPut?: boolean;
    setPostToView: React.Dispatch<React.SetStateAction<AllPostProps | null>>;
    setImagesToView: React.Dispatch<React.SetStateAction<string[] | null>>;
    setImageToViewIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface TextOnlyPostProps extends PostProps {
    type: "text_only";
    data: string;
}

export interface TextWithBackgroundPostProps extends TextOnlyPostProps {
    styling: {
        background: string;
        foreground: string;
    };
}

export interface ImagePostProps extends PostProps {
    type: "text_and_image";
    data: {
        text?: string;
        images: string[];
    };
}

export interface PostContext {
    postToView: AllPostProps | null;
    setCommentInputVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    setImagesToView: PostProps["setImagesToView"];
    setImageToViewIndex: PostProps["setImageToViewIndex"];
}

export type AllPostProps = (TextOnlyPostProps & TextWithBackgroundPostProps) | ImagePostProps;

export default PostProps;
