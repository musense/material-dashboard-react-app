export default function getErrorMessage(errorMessage, returnMessage) {
    if (errorMessage) {
        return errorMessage;
    }
    if (returnMessage) {
        return returnMessage;
    }
    return null;
}