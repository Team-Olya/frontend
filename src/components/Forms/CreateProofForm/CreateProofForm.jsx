import {
    Box,
    Button,
    FormHelperText,
    OutlinedInput,
    TextField,
    Tooltip
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SkillAutocomplete } from "../../../shared/components/SkillAutocomplete/SkillAutocomplete";
import { addTalentProofThunk } from "../../../redux/reducers/talentsProofsReducer";
import { useState } from "react";

const CreateProofForm = () => {
    const [keyForControl, setKeyForControl] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        control
    } = useForm({
        mode: "all",
        defaultValues: {
            skills: []
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        data.status = e.nativeEvent.submitter.value;
        dispatch(addTalentProofThunk(data));
        setKeyForControl(prev => !prev);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        backgroundСolor: "#fff",
                        border: "1px solid #888888",
                        borderRadius: "5px",
                        padding: "15px",
                        marginBottom: "20px"
                    }}
                    display="flex"
                    flexDirection="column"
                >
                    <OutlinedInput
                        sx={{
                            width: "100%",
                            height: "32px",
                            marginBottom: "10px",
                            fontWeight: "bold"
                        }}
                        placeholder="Title"
                        {...register("title", {
                            required: "Title should be at least 2 symbols long",
                            minLength: {
                                value: 2,
                                message:
                                    "Title should be at least 2 symbols long"
                            },
                            maxLength: {
                                value: 160,
                                message:
                                    "Title shouldn't be larger than 160 symbols"
                            }
                        })}
                    />
                    <TextField
                        sx={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "10px"
                        }}
                        placeholder="Tell everyone about your proof"
                        minRows={2}
                        maxRows={10}
                        multiline
                        {...register("description", {
                            required: "Proof should be at least 2 symbols long",
                            minLength: {
                                value: 2,
                                message:
                                    "Proof should be at least 2 symbols long"
                            },
                            maxLength: {
                                value: 2000,
                                message:
                                    "Proof shouldn't be larger than 2000 symbols"
                            }
                        })}
                    />
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <SkillAutocomplete
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Box display="flex" gap="10px">
                        <FormHelperText
                            error
                            component="span"
                            sx={{
                                marginLeft: "10px",
                                marginTop: "auto",
                                marginBottom: "auto"
                            }}
                        >
                            {errors.description?.message ||
                                errors.title?.message}
                        </FormHelperText>
                        <Box
                            sx={{ marginLeft: "auto" }}
                            display="flex"
                            gap="10px"
                        >
                            <Tooltip
                                title="Save as draft"
                                enterDelay={500}
                                enterNextDelay={500}
                            >
                                <Button
                                    type="submit"
                                    value="DRAFT"
                                    variant="outlined"
                                    color="inherit"
                                    disabled={!isValid}
                                >
                                    Save
                                </Button>
                            </Tooltip>
                            <Button
                                type="submit"
                                value="PUBLISHED"
                                color="success"
                                variant="contained"
                                disabled={!isValid}
                            >
                                Publish
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export { CreateProofForm };
