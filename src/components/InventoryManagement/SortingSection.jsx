function SortingSection({ setSortingOption }){

    function handleChange(e){
        setSortingOption(e.target.value)
    }

    return (
        <div>
            <h4>並び替え</h4>

            <select
                onChange={handleChange}
            >
                <option
                    value=""
                >登録順
                </option>
                <option
                    value="low-to-high"
                >在庫数 小 → 多                    
                </option>
                <option
                    value="letter"
                >五十音順                    
                </option>
                <option
                    value="last-update"
                >最終更新日    
                </option>
            </select>
        </div>
    )
}

export default SortingSection;