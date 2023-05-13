import useWindowDimensions from "../../hooks/useWindowDimensions"
import { Box, Card, Typography } from "@mui/material"
import { useState } from "react"
import './style.css'

export default function Login() {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const { width } = useWindowDimensions()

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log({ email, password })
    }

    return <Box display="flex" height="100vh" width="100vw">
        {width > 1000 ?
            <>
                <Box
                    width="50%"
                    padding="3em"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ background: "#dce0e2" }}
                >
                    <Card sx={{ padding: "2em" }}>
                        <Box padding="2em" display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h4" fontFamily="Inter" fontWeight={600} mb={3}>LOGIN</Typography>
                            <Box onSubmit={submitForm} component="form" display="flex" flexDirection="column" alignItems="center">
                                <Box marginTop="3em">
                                    <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Email</Typography>
                                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" />
                                </Box>
                                <Box marginTop="1.5em">
                                    <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Password</Typography>
                                    <input required value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="input" />
                                </Box>
                                <Box marginTop="3em">
                                    <button className="button">Login</button>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>
                <Box
                    width="50%"
                    height="100vh"
                    className="background-gradient"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Typography variant="h1" color="white" fontFamily="Inter" fontWeight={600}>Moovy</Typography>
                    <Typography color="white" fontFamily="Inter" fontWeight={400} fontSize={21}>Your movies, always with you.</Typography>
                </Box>
            </>
            : <>
                <Box
                    width="100%"
                    height="100vh"
                    className="background-gradient"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Card sx={{ padding: "2em" }}>
                        <Box padding="2em" display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h4" fontFamily="Inter" fontWeight={600} mb={3}>LOGIN</Typography>
                            <Box onSubmit={submitForm} component="form" display="flex" flexDirection="column" alignItems="center">
                                <Box marginTop="3em">
                                    <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Email</Typography>
                                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" />
                                </Box>
                                <Box marginTop="1.5em">
                                    <Typography variant="body1" fontFamily="Inter" fontWeight={400}>Password</Typography>
                                    <input required value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="input" />
                                </Box>
                                <Box marginTop="3em">
                                    <button className="button">Login</button>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </>}
    </Box>
}