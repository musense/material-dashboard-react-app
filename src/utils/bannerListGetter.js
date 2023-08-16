import { GetDefaultBannerList } from "api/saga/GetBannerList"
import * as GetBannerAction from 'actions/GetBannerAction';

const bannerListGetter = (dispatch) => async ({ request: { signal } }) => {
    try {
        const response = await GetDefaultBannerList(signal)

        const { currentPage, totalCount, data: bannerList } = response.data
        dispatch({
            type: GetBannerAction.REQUEST_BANNER_SUCCESS,
            payload: {
                bannerList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
        return response
    } catch (error) {
        throw new Error({ message: "Error ocurred while fetching data" }, { status: error.status });
    }
}

export default bannerListGetter