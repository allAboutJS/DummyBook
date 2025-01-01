import crypto from "crypto";

const hashText = (text: string): string => {
    return crypto.createHash("sha256").update(text).digest("hex");
};

hashText.verify = (text: string, hash: string): boolean => {
    return hashText(text) === hash;
};

export default hashText;
