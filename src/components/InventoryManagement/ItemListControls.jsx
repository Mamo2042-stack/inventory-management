import FilteringSection from "./FilteringSection";
import SortingSection from "./SortingSection";

function ItemListControls({ userInput, sortingOption, setUserInput, setSortingOption, isControlOpen, setIsContorlOpen }) {
    return (
        <section className={`item-list-controls ${isControlOpen ? "is-open" : ""}`}>
            <button
                type="button"
                onClick={() => setIsContorlOpen(false)}
            >✕
            </button>

            <SortingSection
                sortingOption={sortingOption}
                setSortingOption={setSortingOption}
            />

            <hr></hr>

            <FilteringSection
                userInput={userInput} 
                setUserInput={setUserInput}
            />
        </section>
    )
}

export default ItemListControls;