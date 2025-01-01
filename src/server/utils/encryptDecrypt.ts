import crypto from "crypto";

export const encrypt = (text: string): string => {
    try {
        const encryptionKey = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
        let encrypted = cipher.update(text, "utf8", "hex");

        encrypted += cipher.final("hex");
        return Buffer.from(
            JSON.stringify({ encryptedData: encrypted, iv: iv.toString("hex"), key: encryptionKey.toString("hex") }),
            "utf-8"
        ).toString("hex");
    } catch (error) {
        throw error;
    }
};

export const decrypt = (encryptedText: string): string => {
    try {
        const { encryptedData, iv, key } = JSON.parse(Buffer.from(encryptedText, "hex").toString("utf-8"));
        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        let decrypted = decipher.update(encryptedData, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        return decrypted;
    } catch (error) {
        throw error;
    }
};
