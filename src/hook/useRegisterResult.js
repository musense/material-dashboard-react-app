import { useState, useEffect } from "react";

export default function useRegisterResult(message) {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        if (!message) return
        let caseMessage = message
        console.log("🚀 ~ file: useRegisterResult.js:10 ~ useEffect ~ message:", message)
        if (message.includes("Password must")) {
            caseMessage = "Password error"
        }
        console.log("🚀 ~ file: useRegisterResult.js:10 ~ useEffect ~ caseMessage:", caseMessage)
        switch (caseMessage) {
            case "user validation failed: email: email not valid!":
            case "email has been used": {
                setTitle("註冊失敗")
                setContent("信箱格式錯誤！")
                setSuccess(false)
                break;
            }
            case "username has been used": {
                setTitle("註冊失敗")
                setContent("此名稱已註冊！")
                setSuccess(false)
                break;
            }
            case "ERR_NETWORK": {
                setTitle("註冊失敗")
                setContent("請重新檢查填入資訊！")
                setSuccess(false)
                break;
            }
            case "ERR_NETWORK": {
                setTitle("註冊失敗")
                setContent("連線錯誤！")
                setSuccess(false)
                break;
            }
            case "Password error": {
                setTitle("註冊失敗")
                setContent("密碼規則錯誤！需英文大小寫+數字共六碼！")
                setSuccess(false)
                break;
            }
            case "register successfully": {
                setTitle("註冊成功")
                setContent("註冊成功！")
                setSuccess(true)
                break;
            }
            default: {
                setTitle("註冊失敗")
                setContent("註冊失敗！")
                setSuccess(false)
                break
            }
        }
        return () => {
            setTitle(null)
            setContent(null)
            setSuccess(null)
        }
    }, [message]);

    return { title, content, success };
}
