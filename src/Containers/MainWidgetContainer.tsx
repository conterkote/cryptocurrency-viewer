import React from 'react';
import NewsMainWidget from "../components/Widgets/News/NewsMainWidget";
import {useFetchBearishNewsQuery, useFetchBullishNewsQuery} from "../store/Apis/coinStatsApi";
import {GiBull, GiMuscleUp, GiPolarBear} from "react-icons/all";
import CapitalizationMainWidget from "../components/Widgets/Capitaliztion/CapitalizationMainWidget";
import {useFetchGlobalDataQuery} from "../store/Apis/logosApi";
import {useSelector} from "react-redux";
import {selectCurrentLogosStatus} from "../store/Slices/coinSync";
import WidgetSkeleton from "../components/Skeletons/WidgetSkeleton";

function MainWidgetContainer() {
  const logoStatus = useSelector(selectCurrentLogosStatus) === 'fulfilled'

  const {data: bullishData, isSuccess: bullishSuccess} = useFetchBullishNewsQuery(undefined, {skip: !logoStatus})
  const {data: bearishData, isSuccess: bearishSuccess} = useFetchBearishNewsQuery(undefined, {skip: !logoStatus})
  const {data: dominanceData, isSuccess: dominanceSuccess} = useFetchGlobalDataQuery(undefined, {skip: !logoStatus})

  let content;

  if (!bearishSuccess || !bullishSuccess || !dominanceSuccess) {
    content = (
      <div className={`grid grid-cols-3 gap-x-12 pt-16`}>
        <WidgetSkeleton widgetName={`Market dominance`}
                        icon={(<GiMuscleUp color={`#dcc397`} className={`-translate-y-[2px]`} size={20}/>)} />
        <WidgetSkeleton widgetName={`Bullish news`}
                        icon={(<GiBull size={20} className={`text-white -translate-y-[1px]`}/>)} />
        <WidgetSkeleton widgetName={`Bearish news`}
                        icon={<GiPolarBear size={24} className={`text-white`}/>} />
      </div>
    )
  } else {
    content = (
      <div className={`grid grid-cols-3 gap-x-12 pt-16`}>
        <CapitalizationMainWidget dominanceData={dominanceData}/>
        <NewsMainWidget newsData={bullishData}
                        newsType={{
                          name: "Bullish news",
                          icon: (<GiBull size={20} className={`text-white -translate-y-[1px]`}/>)
                        }}
        />
        <NewsMainWidget newsData={bearishData}
                        newsType={{
                          name: "Bearish news",
                          icon: (<GiPolarBear size={24} className={`text-white`}/>)
                        }}
        />
      </div>
    )
  }
  return content;
}

export default MainWidgetContainer;