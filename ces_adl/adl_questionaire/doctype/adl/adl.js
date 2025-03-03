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
        const msg = ['Remaining questions:'];
        let err = false;
        frm.question_list.forEach((item) => {
            if (item.value === null || item.value === '') {
                msg.push(item.df.fieldname.replace(/q0*/, '#'));
                err = true;
            }
        });
        
        if (!err) return;

        frappe.throw({
            title: __("Please Answer All Questions!"),
            message: __(msg.join(' ')),
            indicator: 'orange'
        });
        frappe.validated = false;
    },
    on_submit(frm){
        // localtion.reload();
    },
    questionaire_data(frm){
        const jsonData = JSON.parse(frm.doc.questionaire_data);
        frm.set_value('adl_score', jsonData.total);
        result_reading(frm);
    }
});

setup_queationaire = (frm) => {
    frm.fields_dict['q01'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q01',
            fieldtype: 'Select',
            reqd: 1,
            label: '(1) Feeding: การรับประทานอาหารเมื่อเตรียมสํารับไว้ให้เรียบร้อยต่อหน้า',
            options: ['',
                'ไม่สามารถตักอาหารเข้าปากได้ ต้องมีคนป้อนให้',
                'ตักอาหารเองได้ แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไห้หรือตัดเป็นชิ้นเล็กๆ ใว้ล่วงหน้า',
                'ตักอาหารและช่วยตัวเองได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q02'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q02',
            fieldtype: 'Select',
            reqd: 1,
            label: '(2) Grooming: การล้างหน้า หวีผม แปรงฟัน โกนหนวดในระยะเวลา 24–48 ชั่วโมงที่ผ่านมา',
            options: ['',
                'ต้องการความช่วยเหลือ',
                'ทําได้เอง (รวมทั้งที่ทําได้เองถ้าเตรียมอุปกรณ์ไว้ให้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q03'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q03',
            fieldtype: 'Select',
            reqd: 1,
            label: '(3) Transfer: การลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้',
            options: ['',
                'ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คนสองคนช่วยกันยกขึ้น',
                'ต้องการความช่วยเหลืออย่างมาก เช่น ต้องใช้คนแข็งแรงหรือมีทักษะ 1 คน หรือใช้คนทั่วไปสองคนพยุงหรือดันขึ้นมาจึงจะนั่งอยู่ได้',
                'ต้องการความช่วยเหลือบ้าง เช่นบอกให้ทำตาม หรือช่วยพยุงเล็กน้อย หรือต้องมีคนดูแลเพื่อความปลอดภัย',
                'ทําได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q04'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q04',
            fieldtype: 'Select',
            reqd: 1,
            label: '(4) Toilet Use: การใช้ห้องน้ำ',
            options: ['',
                'ช่วยตัวเองไม่ได้',
                'ทําเองได้บ้าง (อย่างน้อยทำความสะอาดตัวเองได้หลังเสร็จธุระ) ต้องการความช่วยเหลือในบางสิ่ง',
                'ช่วยเหลือตัวเองได้ดี (ขึ้นนั่งและลงจากโถส้วมเองได้ ทำความสะอาดได้เรียบร้อยหลังจากเสร็จธุระถอดใส่เสื้อผ้าได้เรียบร้อย)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q05'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q05',
            fieldtype: 'Select',
            reqd: 1,
            label: '(5) Mobility: การเคลื่อนที่ภายในห้องหรือบ้าน',
            options: ['',
                'เคลื่อนที่ไปไหนไม่ได้',
                'ต้องใช้รถเข็นช่วยตัวเองให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) สามารถเข้าออกมุมห้องหรือประตูได้',
                'เดินหรือเคลื่อนที่โดยมีคนช่วย เช่น พยุง หรือบอกให้ทำตาม หรือต้องให้ความสนใจดูแลเพื่อความปลอดภัย',
                'เดินหรือเคลื่อนที่ได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q06'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q06',
            fieldtype: 'Select',
            reqd: 1,
            label: '(6) Dressing: การสวมใส่เสื้อผ้า',
            options: ['',
                'ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย',
                'ช่วยตัวเองได้ประมาณร้อยละ 50 ที่เหลือต้องมีคนช่วย',
                'ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิป หรือใช้เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q07'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q07',
            fieldtype: 'Select',
            reqd: 1,
            label: '(7) Stairs: การขึ้นลงบันได 1 ชั้น',
            options: ['',
                'ไม่สามารถทําได้',
                'ต้องการคนช่วย',
                'ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น Walker จะต้องเอาขึ้น-ลงได้ด้วย)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q08'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q08',
            fieldtype: 'Select',
            reqd: 1,
            label: '(8) Bathing: การอาบน้ำ',
            options: ['',
                'ต้องมีคนช่วยหรือทําให้',
                'อาบน้ำได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q09'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q09',
            fieldtype: 'Select',
            reqd: 1,
            label: '(9) Bowels: การกลั้นการถ่ายอุจจาระใน 1 สัปดาห์ที่ผ่านมา',
            options: ['',
                'กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ',
                'กลั้นไม่ได้บางครั้ง (ไม่เกิน 1 ครั้งต่อสัปดาห์)',
                'กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.fields_dict['q10'] = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            fieldname: 'q10',
            fieldtype: 'Select',
            reqd: 1,
            label: '(10) Bladder: การกลั้นปัสสาวะในระยะ 1 สัปดาห์ที่ผ่านมา',
            options: ['',
                'กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะแต่ไม่สามารถดูแลเองได้',
                'กลั้นไม่ได้บางครั้ง (ไม่เกินวันละ 1 ครั้ง)',
                'กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    
    // ADL source: http://medinfo2.psu.ac.th/medrec/OCPA/images/protocol/ADLScore.pdf

    frm.question_list = [
        frm.fields_dict.q01,
        frm.fields_dict.q02,
        frm.fields_dict.q03,
        frm.fields_dict.q04,
        frm.fields_dict.q05,
        frm.fields_dict.q06,
        frm.fields_dict.q07,
        frm.fields_dict.q08,
        frm.fields_dict.q09,
        frm.fields_dict.q10,
    ];

    $(frm.fields_dict.questionaire_data.wrapper).hide();
}

on_questionaire_change = (frm) => {
    let jsonData = {};
    let totalScore = 0;
    frm.question_list.forEach((item) => {
        if (item.value === null || item.value === '') {
            jsonData[item.df.fieldname] = '';
        } else {
            jsonData[item.df.fieldname] = item.df.options.indexOf(item.value)-1;
            totalScore += jsonData[item.df.fieldname];
        }
    });

    jsonData['total'] = totalScore;
    // jsonData = JSON.stringify(jsonData, null, 4);
    jsonData = JSON.stringify(jsonData);
    frm.set_value('questionaire_data', jsonData);

    // Update radio button when select item in drop down menu
    // Cannot be done, it will cause infinite loop, however, this should not be the case
    // becasue we hide the drop down menu
}

sync_quetionaire_json = (frm) => {
    // Update drop down menu when select item in radio button
    const jsonData = JSON.parse(frm.doc.questionaire_data);
    frm.question_list.forEach((item) => {
        // set value to hidden drop down
        const item_index = jsonData[item.df.fieldname] === '' ? 0 : parseInt(jsonData[item.df.fieldname]+1); // +1 because the first option is empty
        item.set_value(item.df.options[item_index]);

        // set value to radio button
        if (jsonData[item.df.fieldname] !== '' && jsonData[item.df.fieldname] >= 0) {
            const radioId = `${item.df.fieldname}-${parseInt(jsonData[item.df.fieldname])}`;
            $(`#${radioId}`).prop('checked', true);
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
                    const $radio = $(`<input type="radio" name="${radioGroup}" id="${element_id}" value="${$(this).val()}" />`);
                    const $label = $(`<label for="${element_id}">${$(this).text()}</label>`);

                    $radio.on('change', function() {
                        //handle unchecking
                        const isChecked = this.checked;
                        select.val(isChecked ? $(this).val() : '');
                        select.trigger('change');
                        frm.refresh_field(item.df.fieldname); //Refresh field to update display
                    });
                    $radio.appendTo(radio_container);
                    $label.appendTo(radio_container);
                }
            });

            // yet another hack to make radio buttons work with checked/unchecked
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
                    $label.on('mouseout', unbind);
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
    if (adl_score <= 4) {
        result = 'กลุ่มติดเตียง ภาวะพึ่งพาโดยสมบูรณ์: very low initial score, total dependence';
    } else if (adl_score >= 5 && adl_score <= 8) {
        result = 'กลุ่มติดบ้าน ภาวะพึ่งพารุนแรง: low initial score, severe dependence';
    } else if (adl_score >= 9 && adl_score <= 11) {
        result = 'กลุ่มติดบ้าน ภาวะพึ่งพาปานกลาง: intermediate initial score, moderately severs dependence';
    } else if (adl_score >= 12) {
        result = 'กลุ่มติดสังคม ไม่เป็นการพึ่งพา: intermediate high, mildly severs dependence, consideration of discharging home';
    }
    result_loc = frm.fields_dict.adl_result.wrapper.find('.section-head');
    result_loc.empty();
    result_loc.append(`<h3>ผลการประเมิน</h3>`);
    result_loc.append(`<h4>${result}</h4>`);
    result_loc.append(`<p>ผลรวมคะแนน ADL: ${frm.doc.adl_score}/20</p>`);
    $(frm.fields_dict.adl_score.wrapper).hide();
}

/*
0 – 4 คะแนน 	ภาวะพึ่งพาโดยสมบูรณ์ : very low initial score, total dependence
5 - 8 คะแนน 	ภาวะพึ่งพารุนแรง : low initial score, severe dependence
9 - 11 คะแนน 	ภาวะพึ่งพาปานกลาง : intermediate initial score, moderately severs dependence
12 - 20 คะแนน 	ไม่เป็นการพึ่งพา : intermediate high, mildly severs dependence, consideration of discharging home
*/