import registerStorage from "../../operations/registerStorage";
import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";

function StorageRegistration (){
    const [userInput, setUserInput] = useState({
        name: ""
    });
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
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
            setIsErrorModalOpen(true);
            setErrorMsg(result.error);
            return;
        }

        setAppData(result.data);
        setUserInput(previous => ({
            ...previous,
            name: ""
        }));
        navigate("/");
    }

    function handleClick (){
        navigate("/");
    }

    return (
        <>
        <section id="storage-registration-section">
            <h2>ストレージ情報を登録する</h2>
            <form 
                id="storage-registration-form"
                onSubmit={e => handleSubmit(e)}
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
            >戻る
            </button>
        </section>

        {isErrorModalOpen && (
            <div role="alertdialog" aria-modal="true">   
                <p>{"このストレージ名は既に使用されています。"}</p>

                <button
                    type="button"
                    onClick={() => {
                        setIsErrorModalOpen(false);
                        setErrorMsg("");
                        setUserInput(previous => ({
                            ...previous,
                            name: ""
                        }));
                    }}
                >閉じる
                </button>
            </div>
        )}
    </>
    )
}

export default StorageRegistration;