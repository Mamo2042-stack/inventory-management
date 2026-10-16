import FilteringSection from "./FilteringSection";
import SortingSection from "./SortingSection";

function ItemListControls({ userInput, setUserInput, setSortingOption }) {
    return (
        <section>
            <SortingSection
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