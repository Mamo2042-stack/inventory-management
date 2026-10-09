import registerStorage from "../../operations/registerStorage";
import { useNavigate } from "react-router";

function StorageRegistration ({ setCurrentSection, setWhichReg }){
    function handleSubmit(event){
        event.preventDefault();
        
        

    }

    function handleClick(){

    }

    return (
        <div id="storage-registration-section">
            <h2>ストレージ情報を登録する</h2>
            <form 
                id="storage-registration-form"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="storage-name"
                >ストレージ名</label>
                <input
                    type="text"
                    id="storage-name"
                    required
                />

                <button
                    id="submit-btn"
                    type="submit"
                >登録
                </button>
            </form>

            <button
                id="back-to-home-btn"
                onClick={handleClick}
            >戻る
            </button>
        </div>
    )
}

export default StorageRegistration;