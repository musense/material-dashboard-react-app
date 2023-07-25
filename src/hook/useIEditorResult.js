import { useState, useEffect } from "react";

export default function useIEditorResult(message, editor) {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);
    const [id, setId] = useState(null);
    const [sitemapUrl, setSitemapUrl] = useState(null);

    useEffect(() => {
        if (!message) return
        console.log("🚀 ~ file: useIEditorResult.js:11 ~ useEffect ~ message:", message)
        console.log("🚀 ~ file: useIEditorResult.js:11 ~ useEffect ~ editor:", editor)

        switch (message) {
            case 'add fail!': {
                setTitle('Failed!')
                setContent('新增失敗！')
                setSuccess(false)
                return
            }
            case 'add successfully': {
                if (!editor) return
                setTitle('Success')
                setContent('新增成功！')
                setSuccess(true)
                setId(editor._id)
                setSitemapUrl(editor.sitemapUrl)
                return
            }
            case 'update successfully': {
                setTitle('Success')
                setContent('更新成功！')
                setSuccess(true)
                setSitemapUrl(editor.sitemapUrl)
                return
            }
            case 'content title required!': {
                setTitle('Warning')
                setSuccess(false)
                return
            }
            case 'title required!': {
                setTitle('Warning')
                setContent('文章標題為必填！')
                setSuccess(false)
                return
            }
            case 'content required!': {
                setTitle('Warning')
                setContent('文案為必填！')
                setSuccess(false)
                return
            }
            case 'nothing to add!': {
                setTitle('Warning')
                setContent('沒有新增任何資訊！')
                setSuccess(false)
                return
            }
            case 'nothing to update!': {
                setTitle('Warning')
                setContent('沒有更新任何資訊！')
                setSuccess(false)
                return
            }
            case 'Please login first': {
                setTitle('Error')
                setContent('您已被登出！')
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
            setId(null)
            setSitemapUrl(null)
        }
    }, [message, editor]);
    return { title, content, id, sitemapUrl, success };
}
