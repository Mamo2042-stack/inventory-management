function SearchSection({ searchWord, setSearchWord }){

    function handleChange(e){
        const input = e.target.value;

        setSearchWord(input);
    }

    return (
        <>
            <input
                type="text"
                value={searchWord}
                placeholder="名前で検索"
                onChange={handleChange}
            ></input>
        </>
    )
}

export default SearchSection;