import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import SpinnerDatePickerProps from "./interfaces";
import Spinner from "react-native-dynamic-carousel";
import createStyle from "./spinner-date-picker.styles";

const SpinnerDatePicker = ({
  height = 400,
  onSelectedDate,
  initialDate,
  ...props
}: SpinnerDatePickerProps) => {
  const [dayesInMonth, setdayesInMonth] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setselectedMonth] = useState(0);
  const [selectedDay, setselectedDay] = useState(1);
  const styles = createStyle({height});

  useEffect(() => {
    const day = initialDate?.getDate();
    const month = initialDate?.getMonth();
    const year = initialDate?.getFullYear();

    setselectedDay(day ? day : 1);
    setselectedMonth(month ? month + 1 : 0);
    setselectedYear(year ? year : new Date().getFullYear());
  }, [initialDate]);

  const getMonthsPerLang = (lang: string) => {
    const months = Array.from({length: 12}, (e, i) => {
      return new Date(0, i + 1, 0).toLocaleDateString(lang, {
        month: "short",
      });
    });

    return months;
  };

  const getNumberArrayFromRange = ({
    start,
    stop,
    step,
  }: {
    start: number;
    stop: number;
    step: number;
  }) =>
    Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);

  const getDaysInCurrentMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    setMonths(getMonthsPerLang("en"));
    const currentYear = new Date().getFullYear();
    const yearsWithRange = getNumberArrayFromRange({
      start: currentYear,
      stop: currentYear - 100,
      step: -1,
    });

    setYears(yearsWithRange);
  }, []);
  useEffect(() => {
    const datyesInMonth = getDaysInCurrentMonth(selectedYear, selectedMonth);
    const daysArray = getNumberArrayFromRange({
      start: 1,
      stop: datyesInMonth,
      step: 1,
    });

    setdayesInMonth(daysArray);
  }, [selectedMonth]);

  return (
    <View style={styles.container}>
      <Spinner
        initialIndex={dayesInMonth?.findIndex((item) => item === selectedDay)}
        isHorizontal={false}
        data={dayesInMonth.map((item, index) => ({
          ["text"]: item,
        }))}
        height={height}
        itemStyle={{padding: 5}}
        itemHeightPrecentageFromHeight={0.2}
        itemwidthPrecentageFromWidth={0.5}
        itemVerticalRotationDegreeRange={["-60deg", "0deg", "60deg"]}
        ItemView={(item: {text: string}) => (
          <Text style={styles.item}>{item.text}</Text>
        )}
        onSelectItem={(item) => {
          setselectedDay(item.text);
          onSelectedDate &&
            onSelectedDate(new Date(selectedYear, selectedMonth, item.text));
        }}
      />
      <Spinner
        initialIndex={months?.findIndex(
          (item) => item === months[selectedMonth - 1]
        )}
        isHorizontal={false}
        data={months.map((item, index) => ({
          ["text"]: item,
        }))}
        height={height}
        itemStyle={{padding: 5}}
        itemHeightPrecentageFromHeight={0.2}
        itemwidthPrecentageFromWidth={0.5}
        itemVerticalRotationDegreeRange={["-60deg", "0deg", "60deg"]}
        onSelectItem={(item) => {
          const index = months.findIndex((value) => value === item.text);
          setselectedMonth(index);
          onSelectedDate &&
            onSelectedDate(new Date(selectedYear, index, selectedDay));
        }}
        ItemView={(item: {text: string}) => (
          <Text style={styles.item}>{item.text}</Text>
        )}
      />
      <Spinner
        initialIndex={years?.findIndex((item) => item === selectedYear)}
        isHorizontal={false}
        data={years.map((item, index) => ({
          ["text"]: item,
        }))}
        height={height}
        itemStyle={{padding: 5}}
        itemHeightPrecentageFromHeight={0.2}
        itemwidthPrecentageFromWidth={0.5}
        itemVerticalRotationDegreeRange={["-60deg", "0deg", "60deg"]}
        onSelectItem={(item) => {
          setselectedYear(item.text);
          onSelectedDate &&
            onSelectedDate(new Date(item.text, selectedMonth, selectedDay));
        }}
        ItemView={(item: {text: string}) => (
          <Text style={styles.item}>{item.text}</Text>
        )}
      />
    </View>
  );
};

export default SpinnerDatePicker;
