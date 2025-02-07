import { Tabs, Tab } from "@mui/material"

const TabMenu = ({tabValue, handleTabChange, theme})=>{
    return(
        <Tabs
        value={tabValue}
        textColor={theme.palette.primary.main}
        indicatorColor={theme.palette.secondary.main}
        aria-label="secondary tabs example"
        variant="fullWidth"
        onChange={handleTabChange}
      >
        <Tab value="Saved" label="Saved" />
        <Tab value="Collections" label="Collections" />
        <Tab value="Reviews" label="Reviews" />
      </Tabs>
    )
}
export default TabMenu