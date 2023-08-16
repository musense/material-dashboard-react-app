import { useState, useEffect } from "react";

export default function useModalResult({
    message,
    name = '',
    data = undefined,
    isEditor = false
}) {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sitemapUrl, setSitemapUrl] = useState(null);

    useEffect(() => {
        if (!message) return
        let caseMessage = message
        if (message.includes("Password must")) {
            caseMessage = "Password error"
        }
        switch (caseMessage) {
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
            case "logout successfully": {
                setTitle("Success")
                setContent("您已登出！")
                setSuccess(true)
                break
            }
            case "login failed": {
                setTitle("登入失敗")
                setContent("登入失敗！")
                setSuccess(false)
                break
            }
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
            case 'add fail!': {
                setTitle('Failed!')
                setContent(`${name}新增失敗！`)
                setSuccess(false)
                return
            }
            case 'duplicate key error': {
                setTitle('Failed!')
                if (isEditor) {
                    setContent('文章標題不可重複！')
                } else {
                    setContent(`${name}名稱不可重複！`)
                }
                setSuccess(false)
                return
            }
            case 'add successfully': {
                setTitle('Success')
                setContent(`${name}新增成功！`)
                setSuccess(true)
                if (isEditor) {
                    setSitemapUrl(data.sitemapUrl)
                }
                return
            }
            case 'update successfully': {
                setTitle('Success')
                setContent(`${name}更新成功！`)
                setSuccess(true)
                return
            }
            case 'please add tag name': {
                setTitle('Warning')
                setContent(`請輸入[${name}名稱]！`)
                setSuccess(false)
                return
            }
            case 'please add title': {
                setTitle('Warning')
                setContent(`請輸入[${name}名稱]！`)
                setSuccess(false)
                return
            }
            case 'please add keyname': {
                setTitle('Warning')
                setContent(`請輸入${name}[英文名稱]！`)
                setSuccess(false)
                return
            }
            case 'content title required!': {
                setTitle('Warning')
                setContent('文章標題與文案為必填！')
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
            case 'sorting should be typeof number': {
                setTitle('Warning')
                setContent(`${name}排序為數字！`)
                setSuccess(false)
                return
            }
            case 'sorting should be equal or greater than 1': {
                setTitle('Warning')
                setContent(`${name}排序必須大於等於1！`)
                setSuccess(false)
                return
            }
            case 'delete one': {
                setTitle(`是否刪除此${name}？`)
                setContent(`${name}名稱：${data}`)
                setSuccess(null)
                return
            }
            case 'copy sitemapUrl successfully': {
                setTitle('複製成功')
                setContent(`您已複製url: ${data}`)
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
                setContent(`${name}刪除成功！`)
                setSuccess(false)
                return
            }
            case 'delete fail!': {
                setTitle('Failed!')
                setContent(`${name}刪除失敗！`)
                setSuccess(false)
                return
            }
            case 'Please select create date': {
                setTitle('Warning')
                setContent('請輸入創建日期！')
                setSuccess(false)
                return
            }
            case 'Please select start date': {
                setTitle('Warning')
                setContent('請輸入創建開始日期！')
                setSuccess(false)
                return
            }
            case 'Please select end date': {
                setTitle('Warning')
                setContent('請輸入創建結束日期！')
                setSuccess(false)
                return
            }
            case 'Please login first': {
                setTitle('Error')
                setContent(`您已被登出！`)
                setSuccess(false)
                return
            }
            case 'Network Error': {
                setTitle('Error')
                setContent(`取得資料出現錯誤！即將導回登入頁！`)
                setSuccess(false)
                return
            }
            case 'Something went wrong!': {
                setTitle('Error')
                setContent(`Something went wrong!！`)
                setSuccess(false)
                return
            }
            case '--reset-error-message': {
                setTitle(null)
                setContent(null)
                setSuccess(null)
                setSitemapUrl(null)
                return
            }

            default:
                break;
        }
        return () => {
            setTitle(null)
            setContent(null)
            setSuccess(null)
            setSitemapUrl(null)
        }
    }, [message, name, data]);

    return {
        title,
        content,
        success,
        sitemapUrl
    };
}
