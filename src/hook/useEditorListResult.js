import { useState, useEffect } from "react";

export default function useIEditorResult(message, contentData, data) {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!message) return
        console.log("🚀 ~ file: useIEditorResult.js:11 ~ useEffect ~ message:", message)
        console.log("🚀 ~ file: useIEditorResult.js:11 ~ useEffect ~ data:", data)
        console.log("🚀 ~ file: useIEditorResult.js:11 ~ useEffect ~ contentData:", contentData)

        switch (message) {
            case 'delete class': {
                setTitle('是否刪除此分類？')
                setContent(`分類名稱：${contentData}`)
                setSuccess(null)
                return
            }
            case 'delete editor': {
                setTitle('是否刪除此文章？')
                setContent(`文章標題：${contentData}`)
                setSuccess(null)
                return
            }
            case 'delete tag': {
                setTitle('是否刪除此標籤？')
                setContent(`標籤名稱：${contentData}`)
                setSuccess(null)
                return
            }
            case 'copy sitemapUrl successfully': {
                setTitle('複製成功')
                setContent(`您已複製url: ${contentData}`)
                setSuccess(true)
                return
            }
            case 'copy sitemapUrl failed': {
                setTitle('複製失敗！')
                setContent('有什麼地方出錯了QQ')
                setSuccess(false)
                return
            }
            case 'delete successfully': {
                setTitle('Success')
                setContent('刪除成功！')
                setSuccess(false)
                return
            }
            case 'delete fail!': {
                setTitle('Failed!')
                setContent('刪除失敗！')
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
            case 'check__OK!':
            default:
                break;
        }
        return () => {
            setTitle(null)
            setContent(null)
            setSuccess(null)
        }
    }, [message, data, contentData]);
    return { title, content, success };
}
