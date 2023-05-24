import {
    Box,
    Button,
    FormHelperText,
    OutlinedInput,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography
} from "@mui/material";
import { theme } from "../../../shared/themes/neutralColorTheme";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProofThunk } from "../../../redux/reducers/talentsProofsReducer";
import { useState } from "react";
import { getRelativeTime } from "../../../shared/functions/getRelativeTime";
import { ProofSkillsArea } from "../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import { SkillAutocomplete } from "../../../shared/components/SkillAutocomplete/SkillAutocomplete";

const EditProofForm = ({
    id,
    title,
    description,
    status,
    setEditMode,
    date,
    skills
}) => {
    const [alignment, setAlignment] = useState(status);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        control
    } = useForm({
        mode: "all",
        defaultValues: {
            title: title,
            description: description,
            status: status,
            skills: skills.map(item => item.label)
        }
    });

    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(editProofThunk(id, data));
        setEditMode(prev => !prev);
    };

    const handleChange = (e, newAlignment) => {
        if (newAlignment !== null) {
            setValue("status", newAlignment);
            setAlignment(newAlignment);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: "80%" }}>
                        {status === "DRAFT" ? (
                            <OutlinedInput
                                sx={{
                                    width: "100%",
                                    height: "32px",
                                    marginBottom: "10px",
                                    fontWeight: "bold"
                                }}
                                placeholder="Title"
                                {...register("title", {
                                    required:
                                        "Title should be at least 2 symbols long",
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
                        ) : (
                            <>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, width: "100%" }}
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "10px",
                                        color: "#888888"
                                    }}
                                >
                                    {getRelativeTime(date)}
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            height: "20px",
                            justifyContent: "right",
                            width: "30%"
                        }}
                    >
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            {status === "DRAFT" ? (
                                <ToggleButton
                                    value="DRAFT"
                                    sx={{ fontSize: "12px", padding: "5px" }}
                                >
                                    Draft
                                </ToggleButton>
                            ) : null}
                            <ToggleButton
                                value="PUBLISHED"
                                sx={{ fontSize: "12px", padding: "5px" }}
                            >
                                Published
                            </ToggleButton>
                            <ToggleButton
                                value="HIDDEN"
                                sx={{ fontSize: "12px", padding: "5px" }}
                            >
                                Hidden
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                {status === "DRAFT" ? (
                    <TextField
                        sx={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "10px"
                        }}
                        placeholder="Tell everyone your proof"
                        minRows={1}
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
                ) : (
                    <Typography
                        sx={{
                            fontSize: "16px",
                            overflowWrap: "break-word"
                        }}
                    >
                        {description}
                    </Typography>
                )}
                {status === "DRAFT" ? (
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <SkillAutocomplete
                                value={value}
                                onChange={onChange}
                                defaultSkills={skills}
                            />
                        )}
                    />
                ) : (
                    <ProofSkillsArea skills={skills} />
                )}
                <Box display="flex">
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
                            errors.title?.message ||
                            (status === "DRAFT" && status !== alignment && (
                                <FormHelperText error>
                                    After changing Draft status it cannot be set
                                    again
                                </FormHelperText>
                            ))}
                    </FormHelperText>
                    <Box
                        marginLeft="auto"
                        display="flex"
                        gap="10px"
                        marginTop="8px"
                    >
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => setEditMode(prev => false)}
                        >
                            Cancel
                        </Button>
                        <ThemeProvider theme={theme}>
                            {alignment === "DRAFT" ? (
                                <Tooltip
                                    title="Save as draft"
                                    enterDelay={500}
                                    enterNextDelay={500}
                                >
                                    <Box>
                                        <Button
                                            type="submit"
                                            value="DRAFT"
                                            variant="contained"
                                            color="inherit"
                                            disabled={!isValid}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Tooltip>
                            ) : alignment === "PUBLISHED" ? (
                                <Button
                                    type="submit"
                                    value="PUBLISHED"
                                    color="success"
                                    variant="contained"
                                    disabled={!isValid}
                                >
                                    Publish
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    value="HIDDEN"
                                    color="neutral"
                                    variant="contained"
                                    disabled={!isValid}
                                >
                                    Hide
                                </Button>
                            )}
                        </ThemeProvider>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export { EditProofForm };
