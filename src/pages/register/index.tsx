import { Alert, Box, Card, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { api } from "../../services/api";

export default function Register() {
    const { logIn, user, setUser } = useAuth()

    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false)
    const [passwordHide, setPasswordHide] = useState<boolean>(true)
    const [confirmPasswordHide, setConfirmPasswordHide] = useState<boolean>(true)

    useEffect(() => {
        if (user) {
            localStorage.removeItem("session")
            setUser(null)
        }
    }, [user])

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setPasswordMatchError(true)
        } else {
            createUser()
        }
    }

    async function createUser() {
        const res = await api.post('/users', { email, password, full_name: fullName })
        if(res.status === 201) {
            logIn(email, password)
        }
    }

    return <Box display="flex" height="100vh" width="100vw">
        <Box
            width="100%"
            padding="3em"
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="background-gradient"
        >
            <Snackbar open={passwordMatchError} autoHideDuration={2000} onClose={() => setPasswordMatchError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setPasswordMatchError(false)} severity="error" sx={{ width: '100%' }}>
                    Passwords don't match! Verify your password and try again.
                </Alert>
            </Snackbar>
            <Card sx={{ padding: "2em" }}>
                <Box padding="2em" display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" fontFamily="Inter" fontWeight={600} mb={3}>SIGN UP</Typography>
                    <Box onSubmit={submitForm} component="form" display="flex" flexDirection="column" alignItems="center">
                        <Box marginTop="3em">
                            <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Full Name</Typography>
                            <input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="input" />
                        </Box>
                        <Box marginTop="1.5em">
                            <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Email</Typography>
                            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" />
                        </Box>
                        <Box marginTop="1.5em">
                            <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Password</Typography>
                            <Box display="flex" alignItems="center">
                                <input required value={password} onChange={(event) => setPassword(event.target.value)} type={passwordHide ? "password" : undefined} className="input" />
                                <IconButton style={{ padding: 0 }} onClick={() => setPasswordHide(!passwordHide)}>
                                    {!passwordHide ? <VisibilityIcon sx={{ marginLeft: "-2em" }} /> : <VisibilityOffIcon sx={{ marginLeft: "-2em" }} />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Box marginTop="1.5em">
                            <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Confirm Password</Typography>
                            <input required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type={confirmPasswordHide ? "password" : undefined} className="input" />
                            <IconButton style={{ padding: 0 }} onClick={() => setConfirmPasswordHide(!confirmPasswordHide)}>
                                {!confirmPasswordHide ? <VisibilityIcon sx={{ marginLeft: "-2em" }} /> : <VisibilityOffIcon sx={{ marginLeft: "-2em" }} />}
                            </IconButton>
                        </Box>
                        <Box marginTop="3em">
                            <button className="button">Sign up</button>
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Typography fontFamily="Inter">Go back to <Link style={{ color: "black" }} href="/">Sign in</Link></Typography>
                </Box>
            </Card>
        </Box>
    </Box>
}