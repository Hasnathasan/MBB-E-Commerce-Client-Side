import Select from "react-select";

const ReactSelect = ({ selectedState, SetSelectedState, options }) => {
  return (
    <div className="mb-3">
      <label htmlFor="states">State</label>
      <Select
        value={selectedState}
        onChange={(value) => SetSelectedState(value)}
        options={options}
        placeholder="Select a state"
      />
    </div>
  );
};

export default ReactSelect;
