import type { NextPage } from "next";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, Ref, useRef, useState } from "react";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomInputButton = styled.button`
  width: 330px;
  position: relative;
  border-radius: 100px;
  background: #F8F6F5;
  border: none;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 15px 20px;
  text-align: left;
  border: 1px solid #F8F6F5;

  &::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: ${({ datepickerOpened }: { datepickerOpened: boolean }) => datepickerOpened ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
    display: block;
    background: url("chevron.svg") no-repeat;
    width: 15px;
    height: 10px;
  }

  &:hover {
    border-color: #CCCCCC;
  }

  &:focus {
    border-color: #007C8C;
  }
`;

const CustomDaySelectButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomDaySelectButton = styled.button`
  width: calc(100% - 8px);
  padding: 6px 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #222222;
  background: #F0BB3C;
  border-radius: 100px;
  border: none;

  &:first-child {
    margin-right: 16px;
  }
`;

const MonthSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  span {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #222222;
  }
`;

const SwitchMonthButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 30px;
  height: 30px;
  background: #F0BB3C url("arrow.svg") center no-repeat;

  &:last-child {
    transform: rotate(180deg);
  }
`;

const CustomDatepicker: NextPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const datePickerRer = useRef<ReactDatePicker | null>(null);

  const [datepickerOpened, setDatepickerOpened] = useState(false);

  const handleCalendarClose = () => setDatepickerOpened(false);
  const handleCalendarOpen = () => setDatepickerOpened(true);

  const CustomDatepickerSelectButton = forwardRef(
    ({ value, onClick }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, unknown>, ref: Ref<HTMLButtonElement>) => (
      <CustomInputButton onClick={onClick} ref={ref} datepickerOpened={datepickerOpened} className="custom-input-button">
        {value || "Date Picker"}
      </CustomInputButton>
    ));

  CustomDatepickerSelectButton.displayName = 'CustomDatepickerSelectButton';

  return (
    <DatePicker
      ref={datePickerRer}
      renderCustomHeader={({
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        monthDate,
      }) => {
        const selectedDate = new Date(monthDate);
        const currentMonth = selectedDate.getMonth();
        const currentYear = selectedDate.getFullYear();

        const monthHeader = `${months[currentMonth]} ${currentYear}`

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return (
          <div>
            <CustomDaySelectButtonWrapper>
              <CustomDaySelectButton onClick={() => {
                setStartDate(new Date());
                datePickerRer?.current?.setOpen(false);
              }}>
                Today
              </CustomDaySelectButton>
              <CustomDaySelectButton onClick={() => {
                setStartDate(tomorrow);
                datePickerRer?.current?.setOpen(false);
              }}>
                Tomorrow
              </CustomDaySelectButton>
            </CustomDaySelectButtonWrapper>
            <MonthSwitcherWrapper>
              <SwitchMonthButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />
              <span>{monthHeader}</span>
              <SwitchMonthButton onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
            </MonthSwitcherWrapper>
          </div>
        )
      }}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<CustomDatepickerSelectButton />}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
      popperClassName="custom-popper"
      calendarStartDay={1}
      dateFormat="dd/MM/yyyy"
    />
  )
}

export default CustomDatepicker;
