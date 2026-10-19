import registerStorage from "../../operations/registerStorage";
import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";

function StorageRegistration (){
    const [userInput, setUserInput] = useState({
        name: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { appData, setAppData } = useAppData();

    const navigate = useNavigate();

    function handelChange (e){
        const {name, value} = e.target;

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
        <>
        <section id="storage-registration-section">
            <h2>ストレージ情報を登録する</h2>
            <form 
                id="storage-registration-form"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <label
                    htmlFor="storage-name"
                >ストレージ名</label>
                <input
                    type="text"
                    id="storage-name"
                    value={userInput.name}
                    onChange={e => handelChange(e)}
                    required
                />

                {errorMsg && (
                    <p id="storage-error">このストレージ名は既に登録されています。</p>
                )}

                <button
                    id="submit-btn"
                    type="submit"
                    disabled={!userInput.name.trim()}
                >登録
                </button>
            </form>

            <button
                className="back-to-home-btn"
                onClick={handleClick}
            >⇠
            </button>

            {isSuccessModalOpen && (
                <div htmlFor="success-modal">
                    <p>ストレージが登録されました。</p>

                    <button
                        type="button"
                        onClick={() => {
                            navigate("/")
                            setIsSuccessModalOpen(false)
                        }}
                    >⌫
                    </button>
                </div>
            )}
        </section>
    </>
    )
}

export default StorageRegistration;