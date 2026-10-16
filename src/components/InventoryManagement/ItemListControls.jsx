import FilteringSection from "./FilteringSection";

function ItemListControls({ userInput, setUserInput }) {
    return (
        <section>
            <FilteringSection
                userInput={userInput} 
                setUserInput={setUserInput}
            />
        </section>
    )
}

export default ItemListControls;