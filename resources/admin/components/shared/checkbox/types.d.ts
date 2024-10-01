export interface CheckboxProps extends HTMLAttributes<HTMLInputElement>, CommonProps {
    register?: UseFormRegister<any>
    name?: string;
    error?: string;
    label?: Path<any>;
    required?: boolean;
    placeholder?: string;
    checked?: boolean;
    onChange?: (e: any) => void;
}
