import { useState, useEffect } from "react";

export default function useLoginResult(message) {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        if (!message) return
        console.log("🚀 ~ file: useLoginMessageModal.jsx:10 ~ useLoginMessageModal ~ message:", message)
        switch (message) {
            case "can't find user or email!":
            case "can't find user!": {
                setTitle('登入失敗')
                setContent('無此帳號')
                setSuccess(false)
                break
            }
            case "login failed: password not correct":
                setTitle('登入失敗')
                setContent('密碼輸入錯誤')
                setSuccess(false)
                break
            case "ERR_NETWORK": {
                setTitle('登入失敗')
                setContent("連線錯誤！")
                setSuccess(false)
                break
            }
            case "login successfully": {
                setTitle("登入成功")
                setContent("登入成功！")
                setSuccess(true)
                break
            }
            case "login failed":
            default: {
                setTitle("登入失敗")
                setContent("登入失敗！")
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
