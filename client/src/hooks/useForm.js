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
	}, [errors, callback, isSubmitting, values]);

	const handleChange = (e) => {
		e && e.persist();
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
