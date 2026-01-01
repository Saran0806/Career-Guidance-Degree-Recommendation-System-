import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const degrees = [
  {
    name: "MBBS",
    careers: "Doctor, Surgeon",
    duration: "5.5 Years",
    eligibility: "Biology Group",
  },
  {
    name: "B.E / B.Tech",
    careers: "Engineer, Developer",
    duration: "4 Years",
    eligibility: "Maths + Physics",
  },
  {
    name: "B.Sc Computer Science",
    careers: "Software Developer",
    duration: "3 Years",
    eligibility: "Maths",
  },
  {
    name: "Any Degree",
    careers: "IAS, IPS, Govt Jobs",
    duration: "3 Years",
    eligibility: "Any Stream",
  },
];

export default function DegreeGuide() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold">
        Degree Guide
      </Typography>
      <Typography opacity={0.8} mt={1}>
        Understand degrees and their career scope
      </Typography>

      <Grid container spacing={3} mt={3} justifyContent="center">
        {degrees.map((d, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 0 25px rgba(0,255,255,0.4)",
                },
              }}
            >
              <CardContent>
                <Typography fontWeight="bold">{d.name}</Typography>
                <Typography fontSize={14}>
                  Careers: {d.careers}
                </Typography>
                <Typography fontSize={14}>
                  Duration: {d.duration}
                </Typography>
                <Typography fontSize={14}>
                  Eligibility: {d.eligibility}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
