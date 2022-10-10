const Alert = (props) => {
    const {isOpened, status, message, onClose} = props

    const setBackGroundColor = () => {
        let bgColor = ''
        switch (status) {
            case 'success':
                bgColor = 'bg-green-600'
                break;
            case 'error':
                bgColor = 'bg-red-600'
                break;
            default:
                break;
        }

        return bgColor
    }

    return (
        <div className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${setBackGroundColor()} ${isOpened ? 'block' : 'hidden'}`}>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize">{ status ? `${status}!` : 'Alert!' }</b> {message ? message : 'Alert message.'}
            </span>
            <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={onClose}>
                <span>×</span>
            </button>
        </div>
    )
}

export default Alert