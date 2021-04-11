import { useState, useEffect } from 'react';

// add validate function as second arg
// to useForm hook
const useForm = (callback, validate) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback(values);
			clearInput();
		}
		return setIsSubmitting(false);
	}, [errors, callback, isSubmitting, values, clearInput]);

	const handleChange = (e) => {
		e && e.persist();
		// figure out how to toggle checkbox
		//
		// if (e.target.type === 'checkbox') {
		//   setValues((prev) => ({
		//     ...prev,
		//     [e.target.name]: !prev[e.currentTarget.name]
		//   }));
		// }
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const clearInput = () => {
		setValues({});
	};

	const handleSubmit = (e) => {
		!!e && e.preventDefault();
		setIsSubmitting(true);
		setErrors(validate(values));
	};

	return {
		handleChange,
		handleSubmit,
		clearInput,
		values,
		errors,
	};
};

export default useForm;
