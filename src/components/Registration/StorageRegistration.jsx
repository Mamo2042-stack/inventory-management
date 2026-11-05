import registerStorage from "../../operations/registerStorage";
import { useNavigate } from "react-router";
import { useAppData } from "../../context/useAppData";
import { useState } from "react";
import "./StorageRegistration.css"

function StorageRegistration (){
    const [userInput, setUserInput] = useState({
        name: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { appData, setAppData } = useAppData();

    const navigate = useNavigate();

    function handelChange (e){
        const {value} = e.target;

        setUserInput(previous => ({
            ...previous,
            name: value
        }))
    }

    function handleSubmit(event){
        event.preventDefault();

        const result = registerStorage(appData, userInput)

        if(!result.success){
            setErrorMsg(result.error);
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setUserInput(previous => ({
            ...previous,
            name: ""
        }));
        setIsSuccessModalOpen(true);
    }

    function handleClick (){
        navigate("/registration");
    }

    return (
        <section className="storage-registration-section">
            <h1>
                <span>ストレージ情報を</span>
                <span>登録する</span>
            </h1>

            <form 
                className="storage-registration-form"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <div className="storage-name-input-section">
                    <label
                        htmlFor="storage-name"
                    >ストレージ名</label>
                    <input
                        type="text"
                        id="storage-name"
                        className="form-input"
                        maxLength={15}
                        value={userInput.name}
                        onChange={e => handelChange(e)}
                        required
                    />

                    {errorMsg === "DUPLICATE_NAME" && (
                        <p className="error-message">このストレージ名は既に登録されています。</p>
                    )}

                    {errorMsg === "TOO_MANY_LETTERS" && (
                        <p className="error-message">文字数の上限は15文字です。</p>
                    )}
                </div>
                <button
                    id="submit-btn"
                    type="submit"
                    disabled={!userInput.name.trim()}
                >登録
                </button>
            </form>

            <button
                className="back-to-previous-button"
                onClick={handleClick}
            >⬅︎
            </button>


            <div>
                {isSuccessModalOpen && (
                    <div className="success-modal-backdrop"
                        onClick={() => {
                            setIsSuccessModalOpen(false)
                            navigate("/")
                        }}
                    />
                )}    

                <div className={`success-modal ${isSuccessModalOpen ? "is-open" : ""}`}>
                    <p className="success-message">
                        <span>ストレージが</span>
                        <span>登録されました。</span>
                    </p>

                    <button
                        type="button"
                        className="back-to-previous-button clickable-button"
                        onClick={() => {
                            navigate("/")
                            setIsSuccessModalOpen(false)
                        }}
                    >⬅︎ ホーム
                    </button>
                </div>
            </div>
        </section>
    )
}

export default StorageRegistration;