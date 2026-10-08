function Registration ({ setWhichReg }){
    return(
        <div id="registration">
            <button
                id="storage-registration-btn"
                onClick={() => setWhichReg("storage")}
                >
                    ストレージ
            </button>

            <button
                id="item-registration-btn"
                onClick={() => setWhichReg("item")}
                >
                    食材
            </button>
        </div>
    )
}

export default Registration;