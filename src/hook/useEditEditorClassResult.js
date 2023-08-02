import { useState, useEffect } from "react";

export default function useEditEditorClassResult(message) {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!message) return
        console.log("🚀 ~ file: useEditEditorClassResult.js:11 ~ useEffect ~ message:", message)
        switch (message) {
            case 'add fail!': {
                setTitle('Failed!')
                setContent('文章分類新增失敗！')
                setSuccess(false)
                return
            }
            case 'duplicate key error': {
                setTitle('Failed!')
                setContent('分類名稱不可重複！')
                setSuccess(false)
                return
            }
            case 'add successfully': {
                setTitle('Success')
                setContent('文章分類新增成功！')
                setSuccess(true)
                return
            }
            case 'update successfully': {
                setTitle('Success')
                setContent('文章分類更新成功！')
                setSuccess(true)
                return
            }
            case 'please add title': {
                setTitle('Warning')
                setContent('請輸入 [分類名稱]！')
                setSuccess(false)
                return
            }
            case 'please add keyname': {
                setTitle('Warning')
                setContent('請輸入 [英文名稱]！')
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
