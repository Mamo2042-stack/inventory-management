import FilteringSection from "./FilteringSection";
import SortingSection from "./SortingSection";

function ItemListControls({ userInput, sortingOption, setUserInput, setSortingOption }) {
    return (
        <section>
            <SortingSection
                sortingOption={sortingOption}
                setSortingOption={setSortingOption}
            />

            <FilteringSection
                userInput={userInput} 
                setUserInput={setUserInput}
            />
        </section>
    )
}

export default ItemListControls;