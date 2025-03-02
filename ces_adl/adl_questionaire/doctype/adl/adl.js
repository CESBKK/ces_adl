// Copyright (c) 2025, Cloud Engineering and Services Company Limited and contributors
// For license information, please see license.txt

frappe.ui.form.on('ADL', {
    setup(frm){
        // frappe.ui.toolbar.clear_cache();
        setup_queationaire(frm);
        make_radio_button(frm);
    },
    before_load(frm){
        result_reading(frm);
    },
    refresh(frm){
        sync_quetionaire_json(frm);
    },
    validate(frm){
        frm.question_list.every((item) => {
            if (item.value === null || item.value === '') {
                frappe.msgprint({
                    title: __('Validation Error'),
                    message: __('Please answer all questions.'),
                    indicator: 'orange'
                });
                frappe.validated = false;
                return false;
            }
            return true;
        });
    },
    on_submit(frm){
        localtion.reload();
    },
    questionaire_data(frm){
        const jsonData = JSON.parse(frm.doc.questionaire_data);
        frm.set_value('adl_score', jsonData.total);
        // frm.dirty();
        result_reading(frm);
    }
});

setup_queationaire = (frm) => {
    frm.q01 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(1) รับประทานอาหารเมื่อเตรียมสํารับไว้ให้เรียบร้อยต่อหน้า',
            fieldname: 'q01',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถตักอาหารเข้าปากได้',
                '1 ตักอาหารเองได้ แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไห้/ตัดเป็นชิ้นเล็กๆให้',
                '2 ตักอาหารและช่วยตัวเองได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q02 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(2) การล้างหน้า หวีผม แปรงฟัน โกนหนวดในระยะเวลา 24–48 ชั่วโมงที่ผ่านมา',
            fieldname: 'q02',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องการความช่วยเหลือ',
                '1 ทําได้เอง (รวมทั้งที่ทําได้เองถ้าเตรียมอุปกรณ์ไว้ให้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q03 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(3) ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้',
            fieldname: 'q03',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คน 2 คนช่วยกันยกขึ้น',
                '1 ต้องใช้คนแข็งแรงหรือมีทักษะ 1 คน/ใช้คนทั่วไป 2 คนพยุงดันขึ้นมาจึงจะนั่งอยู่ได้',
                '2 ต้องการความช่วยเหลือบ้าง เช่นช่วยพยุงเล็กน้อย/ต้องมีคนดูแลเพื่อความปลอดภัย',
                '3 ทําได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q04 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(4) การใช้ห้องน้ำ',
            fieldname: 'q04',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ช่วยตัวเองไม่ได้',
                '1 ทําเองได้บ้าง ต้องการความช่วยเหลือในบางสิ่ง',
                '2 ช่วยเหลือตัวเองได้ดี'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q05 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(5) การเคลื่อนที่ภายในห้องหรือบ้าน',
            fieldname: 'q05',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 เคลื่อนที่ไปไหนไม่ได้',
                '1 ใช้รถเข็นช่วยให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) เข้าออกมุมห้องหรือประตูได้',
                '2 เดินหรือเคลื่อนที่โดยมีคนช่วย เช่น พยุง',
                '3 เดินหรือเคลื่อนที่ได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q06 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(6) การสวมใส่เสื้อผ้า',
            fieldname: 'q06',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย',
                '1 ช่วยตัวเองได้ประมาณร้อยละ 50 ที่เหลือต้องมีคนช่วย',
                '2 ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิป ใส่เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q07 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(7) การขึ้นลงบันได 1 ชั้น',
            fieldname: 'q07',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถทําได้',
                '1 ต้องการคนช่วย',
                '2 ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น Walker จะต้องเอาขึ้นลงได้ด้วย)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q08 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(8) การอาบน้ำ',
            fieldname: 'q08',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนช่วยหรือทําให้',
                '1 อาบน้ำได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q09 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(9) การกลั้นการถ่ายอุจจาระ ใน 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q09',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกิน 1 ครั้งต่อสัปดาห์)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q10 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(10) การกลั้นปัสสาวะในระยะ 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q10',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะ แต่ไม่สามารถดูแลเองได้',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกินวันละ 1 ครั้ง)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    
    frm.question_list = [frm.q01, frm.q02, frm.q03, frm.q04, frm.q05, frm.q06, frm.q07, frm.q08, frm.q09, frm.q10];
    $(`[data-fieldname="questionaire_data"]`).hide();
}

on_questionaire_change = (frm) => {
    let jsonData = {};
    let totalScore = 0;
    frm.question_list.forEach((item) => {
        if (item.value === null || item.value === '') {
            jsonData[item.df.fieldname] = '';
        } else {
            jsonData[item.df.fieldname] = parseInt(item.value.split(' ')[0]);
            totalScore += jsonData[item.df.fieldname];
        }
    });

    jsonData['total'] = totalScore;
    // jsonData = JSON.stringify(jsonData, null, 4);
    jsonData = JSON.stringify(jsonData);
    frm.set_value('questionaire_data', jsonData);

    // Update radio button
    // Cannot be done it will cause infinite loop, however, this should not be the case
    // becasue we hide the drop down menu
}

sync_quetionaire_json = (frm) => {
    let jsonData = frm.doc.questionaire_data;

    // For Debugging (remove in production)
    // jsonData = '{"q01":"","q02":"","q03":3,"q04":2,"q05":1,"q06":1,"q07":1,"q08":1,"q09":1,"q10":1, "total":9}';
    jsonData = JSON.parse(jsonData);

    frm.question_list.forEach((item) => {
        // set value to hidden drop down
        const item_index = jsonData[item.df.fieldname] === '' ? 0 : parseInt(jsonData[item.df.fieldname]+1);
        item.set_value(item.df.options[item_index]); // +1 because the first option is empty

        // set value to shown radio button
        if (jsonData[item.df.fieldname] !== '' && jsonData[item.df.fieldname] >= 0) {
            const radioId = `${item.df.fieldname}-${parseInt(jsonData[item.df.fieldname])}`; //Corrected id construction
            $(`#${radioId}`).prop('checked', true);  // Use prop('checked', true)
        } else {
            //Handle the case where no radio should be selected
            $(`input[name="${item.df.fieldname}Group"]`).prop('checked', false); //Uncheck all radios
        }
    });
};

make_radio_button = (frm) => {
    /*
    Display drop-down menu in radio button format.
    Frappe 15 does not have radio button. We will need to use this procedures if we need radio button.
    Drop down still exist but we hide it.
    https://stackoverflow.com/questions/3974217/convert-dropdowns-to-radio-buttons-w-o-modifying-html
    */
    frm.question_list.forEach((item) => {
        $(`[data-fieldname="${item.df.fieldname}"][placeholder]`).each((selectIndex, selectElement) => {
            const select = $(selectElement);
            const radioGroup = `${item.df.fieldname}Group`;
            const container_id = `${item.df.fieldname}GroupContainer`;
            const container = $(`<div id="${container_id}" class="radioSelectContainer" />`);
            select.after(container);
            container.append(select);
            select.hide();
            $('.select-icon').hide();

            select.find('option').each(function (optionIndex, optionElement) { // get the options
                const radio_container = $(`<div />`);
                $(radio_container).remove();

                if ($(this).val() !== '') {
                    radio_container.appendTo(container);
                    const element_id = `${item.df.fieldname}-${(parseInt(optionIndex)-1)}`;
                    const $radio = $(`<input type="radio" name="${radioGroup}" id="${element_id}" value="${$(this).val()}">`);
                    const $label = $(`<label for="${element_id}">${$(this).text()}</label>`);

                    $radio.on('change', function() {
                        //Efficiently handle unchecking
                        const isChecked = this.checked;
                        select.val(isChecked ? $(this).val() : '');
                        select.trigger('change');
                        frm.refresh_field(item.df.fieldname); //Refresh field to update display
                    });
                    $radio.appendTo(radio_container);
                    $label.appendTo(radio_container);
                }
            });

            container.find(":radio + label").on('mousedown', function () {
                const $label = $(this);
                const $radio = $label.prev();
                if ($radio.is(':checked')) {
                    const uncheck = () => {
                        setTimeout(() => {
                            $radio.prop('checked', false);
                            select.val(null);
                            select.trigger('change');
                        }, 0);
                    };
                    const unbind = () => {
                        $label.off('mouseup', up);
                    };
                    const up = () => {
                        uncheck();
                        unbind();
                    };
                    $label.on('mouseup', up);
                    $label.one('mouseout', unbind);
                } else {
                    select.val($radio.val());
                }
            });

            // select.on('change',() => { //select updates radio
            //     $(`input[name="${radioGroup}"][value="${select.value}"]`).prop('checked', true);
            // });
        });
    });
}

result_reading = (frm) => {
    const adl_score = parseInt(frm.doc.adl_score);
    let result = '';
    if (adl_score >= 0 && adl_score <= 4) {
        result = 'ภาวะพึ่งพาโดยสมบูรณ์ : very low initial score, total dependence';
    } else if (adl_score >= 5 && adl_score <= 8) {
        result = 'ภาวะพึ่งพารุนแรง : low initial score, severe dependence';
    } else if (adl_score >= 9 && adl_score <= 11) {
        result = 'ภาวะพึ่งพาปานกลาง : intermediate initial score, moderately severs dependence';
    } else if (adl_score >= 12 && adl_score <= 20) {
        result = 'ไม่เป็นการพึ่งพา : intermediate high, mildly severs dependence, consideration of discharging home';
    }
    result_loc = frm.fields_dict.adl_result.wrapper.find('.section-head');
    result_loc.empty();
    result_loc.append(`<h3>ผลการประเมิน - ${result}</h3>`);
    result_loc.append(`<p>ADL Score: ${frm.doc.adl_score}/20</p>`);
    $(frm.fields_dict.adl_score.wrapper).hide();
}

/*
0 – 4 คะแนน 	ภาวะพึ่งพาโดยสมบูรณ์ : very low initial score, total dependence
5 - 8 คะแนน 	ภาวะพึ่งพารุนแรง : low initial score, severe dependence
9 - 11 คะแนน 	ภาวะพึ่งพาปานกลาง : intermediate initial score, moderately severs dependence
12 - 20 คะแนน 	ไม่เป็นการพึ่งพา : intermediate high, mildly severs dependence, consideration of discharging home
*/