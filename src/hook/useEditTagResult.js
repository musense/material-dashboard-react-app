import { useState, useEffect } from "react";

export default function useEditTagResult(message) {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!message) return
        console.log("🚀 ~ file: useEditTagResult.js:11 ~ useEffect ~ message:", message)
        switch (message) {
            case 'add fail!': {
                setTitle('Failed!')
                setContent('標籤新增失敗！')
                setSuccess(false)
                return
            }
            case 'duplicate key error': {
                setTitle('Failed!')
                setContent('標籤名稱不可重複！')
                setSuccess(false)
                return
            }
            case 'add successfully': {
                setTitle('Success')
                setContent('標籤新增成功！')
                setSuccess(true)
                return
            }
            case 'update successfully': {
                setTitle('Success')
                setContent('標籤更新成功！')
                setSuccess(true)
                return
            }
            case 'please add tag name': {
                setTitle('Warning')
                setContent('請輸入 [標籤名稱]！')
                setSuccess(false)
                return
            }
            case 'sorting should be typeof number': {
                setTitle('Warning')
                setContent('熱門標籤排序為數字！')
                setSuccess(false)
                return
            }
            case 'sorting should be equal or greater than 1': {
                setTitle('Warning')
                setContent('熱門標籤排序必須大於等於1！')
                setSuccess(false)
                return
            }
            case 'Please login first': {
                setTitle('Error')
                setContent('您已被登出！')
                setSuccess(false)
                return
            }
            case 'Network Error': {
                setTitle('Error')
                setContent('取得資料出現錯誤！即將導回登入頁！')
                setSuccess(false)
                return
            }
            case '--reset-error-message': {
                setTitle(null)
                setContent(null)
                setSuccess(null)
                return
            }

            default:
                break;
        }
        return () => {
            setTitle(null)
            setContent(null)
            setSuccess(null)
        }
    }, [message]);
    return { title, content, success };
}
