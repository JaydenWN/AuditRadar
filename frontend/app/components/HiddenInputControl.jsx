//I use this component to use remix <Form/> component
//Remix uses <input> and doesnt see mantine inputs for Form.
//In the future look at mantine use-form for validation

export default function HiddenInputControl({name, value, type}){
        return(
            <>
                <input type='hidden' name={name} value={value}></input>
            </>
        )
}